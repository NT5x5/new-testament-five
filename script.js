async function loadPlan() {
  try {
    const res = await fetch('plan.json');
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    const data = await res.json();

    const tbody = document.querySelector('#plan-table tbody');
    if (tbody) {
      data.weeks.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${item.week}</td>
          <td>${item.dates[0]}–${item.dates[1]}</td>
          <td>${item.chapters.join(', ')}</td>
          <td><input type="checkbox" onchange="updateDone(${item.week}, this.checked)"></td>
        `;
        tbody.appendChild(tr);
      });
      loadDone();
    }

  } catch (error) {
    console.error('Failed to load plan:', error);
  }
}

function updateDone(week, done) {
  localStorage.setItem(`week${week}`, done);
}

function loadDone() {
  document.querySelectorAll('#plan-table tbody tr').forEach(tr => {
    const week = tr.cells[0].textContent;
    const chk = tr.querySelector('input[type=checkbox]');
    chk.checked = (localStorage.getItem(`week${week}`) === 'true');
  });
}

loadPlan();
